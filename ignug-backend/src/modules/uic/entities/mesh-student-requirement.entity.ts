import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RequirementEntity, RequirementRequestEntity } from '@uic/entities';

@Entity('mesh_student_requirements', { schema: 'uic' })
export class MeshStudentRequirementEntity {
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
  
  // Relationships
  //OneToMany RequirementRequestEntity
  @OneToMany(() => RequirementRequestEntity, (requirementRequest) => requirementRequest.meshStudentRequirement)
  requirementRequests: RequirementRequestEntity[];
  //requirement
  @ManyToOne(() => RequirementEntity, (requirement) => requirement.meshStudentRequirements)
   @JoinColumn({ name: 'requirement_id'})
   requirement: RequirementEntity;

  //  @ManyToOne(() => MeshStudentEntity, (meshStudent) => meshStudent.meshStudentRequirements)
  //  @JoinColumn({ name: 'mesh_student_id'})
  //  meshStudent: MeshStudentEntity;


  // Fields
  @Column('boolean', {
    name: 'approved',
    comment: 'True= proyecto aprobado, False=proyecto reprobado',
  })
  approved: boolean;

  @Column('varchar', {
    name: 'observations',
    comment: 'El tutor escribirá un comentario de ser necesario',
  })
  observations: string;
 }
