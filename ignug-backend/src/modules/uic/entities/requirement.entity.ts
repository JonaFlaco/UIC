import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MeshStudentRequirementEntity,RequirementRequestEntity } from '@uic/entities';
@Entity('requirements', { schema: 'uic' })
export class RequirementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  //Relationship
  
  @OneToMany(() => RequirementRequestEntity, (requirementRequest) => requirementRequest.name)
    requirementRequests: RequirementRequestEntity[];

  @OneToMany(() => MeshStudentRequirementEntity, (meshStudentRequirement) => meshStudentRequirement.requirement)
    meshStudentRequirements: MeshStudentRequirementEntity[];

  /*@ManyToOne(() => CareerEntity, (career) => career.requirements)
    @JoinColumn({ name: 'career_id'})
    career: CareerEntity;*/

  //Fields

  @Column('text', {
    name: 'description',
    comment: 'Indicaciones del requerimiento',
  })
  description: string;

  @Column('boolean', {
    name: 'is_enable',
    comment: 'True estara disponible y False si no lo estara',
  })
  isEnable: boolean;

  @Column('varchar', {
    name: 'name',
    comment: 'Nombre del requerimiento',
  })
  name: string;

  @Column('boolean', {
    name: 'required',
    comment: 'True si el documento es requerido y False si no lo es',
  })
  required: boolean;

  @Column('boolean', {
    name: 'solicited',
    comment:
      'True si la institución puede otorgar el requerimiento y False si no lo puede hacer',
  })
  solicited: boolean;


  @BeforeInsert()
  @BeforeUpdate()
  setname() {
    if (!this.name) {
      return;
    }
  this.name= this.name.toLowerCase().trim()
  }
 
}
