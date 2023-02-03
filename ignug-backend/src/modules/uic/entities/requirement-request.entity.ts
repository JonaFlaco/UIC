import { MeshStudentRequirementEntity, RequirementEntity } from '@uic/entities';
import {
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

@Entity('requirement_requests', { schema: 'uic' })
export class RequirementRequestEntity {
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
  //ManyToOne corregir requirement
  @ManyToOne(() => RequirementEntity, (name) => name.requirementRequests)
   @JoinColumn({ name: 'requirement_id'})
   name: RequirementEntity;

   //ManyToOne corregir meshStudent requirement
   @ManyToOne(() => MeshStudentRequirementEntity, (meshStudentRequirement) => meshStudentRequirement.requirementRequests)
   @JoinColumn({ name: 'mesh_student_requirement_id'})
   meshStudentRequirement: MeshStudentRequirementEntity;

  //  @ManyToOne(() => MeshStudentEntity, (meshStudent) => meshStudent.requirementRequests)
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

  // @Column('timestamp', {
  //   name: 'registered_at',
  //   comment: 'Fecha en la que se envio la solicitud',
  // })
  // registered_at: Date;

}